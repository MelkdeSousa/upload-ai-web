import { FileVideo, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

export const UploadVideoForm = () => (
    <form className='space-y-6'>
        <label htmlFor="video" className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'>
            <FileVideo className='w-4 h-4' />
            Selecione um vídeo
        </label>

        <input type="file" id="video" accept='video/mp4' className='sr-only ' />

        <Separator />

        <div className='space-y-2'>
            <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>

            <Textarea
                id='transcription_prompt'
                className='h-20 resize-none p-4 leading-relaxed'
                placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgulas (,)' />
        </div>

        <Button className='w-full' type='submit'>
            Carregar vídeo
            <Upload className='w-4 h-4 ml-2' />
        </Button>
    </form>
);
