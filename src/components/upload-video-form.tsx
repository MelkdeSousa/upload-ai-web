import { getFFmpeg } from '@/lib/ffmpeg';
import { uploadAIApi } from '@/services/api/uploadAi';
import { fetchFile } from '@ffmpeg/util';
import { FileVideo, Upload } from 'lucide-react';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

type VideoStatus = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

type UploadVideoFormProps = {
    onVideoUploaded: (videoId: string) => void
}

const videoStatusMessages = new Map<VideoStatus, JSX.Element>([
    ['converting', <>
        Convertendo o vídeo...
    </>
    ],
    ['generating', <>
        Gerando a transcrição...
    </>
    ],
    ['uploading', <>
        Enviando o vídeo para a IA...
    </>
    ],
    ['success', <>
        Transcrição realizada com sucesso!
    </>
    ],
    ['waiting', (<>
        Carregar vídeo
        <Upload className='w-4 h-4 ml-2' /></>)],
])

export const UploadVideoForm = (props: UploadVideoFormProps) => {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const promptInputRef = useRef<HTMLTextAreaElement | null>(null)
    const [videoStatus, setVideoStatus] = useState<VideoStatus>('waiting')

    const previewUrl = useMemo(() => {
        if (!videoFile) return

        return URL.createObjectURL(videoFile)
    }, [videoFile])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget


        if (!files) return

        const [selectedFile] = files

        setVideoFile(selectedFile)
    }

    const convertVideoToAudio = async (video: File) => {
        const ffmpeg = await getFFmpeg()

        await ffmpeg.writeFile('input.mp4', await fetchFile(video))

        ffmpeg.on('progress', progress => {
            console.log(Math.round(progress.progress * 100) + '%')
        })

        await ffmpeg.exec([
            '-i', 'input.mp4',
            '-map', '0:a',
            '-b:a', '20k',
            '-acodec',
            'libmp3lame',
            'output.mp3'
        ])

        const data = await ffmpeg.readFile('output.mp3')

        const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
        const audioFile = new File([audioFileBlob], 'audio.mp3', {
            type: 'audio/mpeg'
        })

        return audioFile
    }

    const handleUploadVideo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const prompt = promptInputRef.current?.value

        if (!videoFile) return

        setVideoStatus('converting')
        const audioFile = await convertVideoToAudio(videoFile)

        const data = new FormData()

        data.append('file', audioFile)

        setVideoStatus('uploading')

        const response = await uploadAIApi<{ video: { id: string } }>('/videos', 'POST', data,)

        setVideoStatus('generating')

        await uploadAIApi(`/videos/${response.video.id}/transcription`, 'POST', JSON.stringify({
            prompt
        }), 'application/json')

        setVideoStatus('success')

        props.onVideoUploaded(response.video.id)
    }

    return (
        <form onSubmit={handleUploadVideo} className='space-y-6'>
            <label htmlFor="video" className='relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'>
                {videoFile ? (
                    <video src={previewUrl} controls={false} className='absolute inset-0 pointer-events-none'></video>
                ) : (
                    <>
                        <FileVideo className='w-4 h-4' />
                        Selecione um vídeo
                    </>
                )}
            </label>

            <input type="file" id="video" accept='video/mp4' className='sr-only' onChange={handleFileChange} />

            <Separator />

            <div className='space-y-2'>
                <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>

                <Textarea
                    disabled={videoStatus !== 'waiting'}
                    ref={promptInputRef}
                    id='transcription_prompt'
                    className='h-20 resize-none p-4 leading-relaxed'
                    placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgulas (,)' />
            </div>

            <Button data-success={videoStatus === 'success'} disabled={videoStatus !== 'waiting'} className='w-full data-[success=true]:bg-emerald-400' type='submit'>
                {videoStatusMessages.get(videoStatus)}
            </Button>
        </form>
    );
}
