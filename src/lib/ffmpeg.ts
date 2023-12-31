import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"

let ffmpeg: FFmpeg | null

export const getFFmpeg = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/esm'
    if (ffmpeg) return ffmpeg

    ffmpeg = new FFmpeg()

    if (!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
        })
    }

    return ffmpeg
}