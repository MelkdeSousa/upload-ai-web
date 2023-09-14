import { Wand2 } from 'lucide-react'
import { Header } from './components/Header'
import { UploadVideoForm } from './components/UploadVideoForm'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Separator } from './components/ui/separator'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 p-6 flex gap-6'>
        <section className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
            />
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA...'
              readOnly
            />

          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável <code className='text-violet-400 '>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </section>

        <aside className='w-80 space-y-6'>
          <UploadVideoForm />

          <Separator />

          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>

              <Select defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione um prompt...' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='title'>Titulo do Youtube</SelectItem>
                  <SelectItem value='description'>Descrição do Youtube</SelectItem>
                </SelectContent>
              </Select>


            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>

              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT-3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className='block text-xs text-muted-foreground italic'>
                Você poderá customizar essa opção em breve.
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura </Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type='submit' className='w-full'>
              Executar
              <Wand2 className='h-4 w-4 ml-2' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default App