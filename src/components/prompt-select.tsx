import { uploadAIApi } from "@/services/api/uploadAi"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export type Prompt = {
    id: string
    title: string
    template: string
}

export type PromptSelectProps = {
    onPromptSelected: (template: string) => void
}

export const PromptSelect = (props: PromptSelectProps) => {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    const handlePromptSelected = (promptId: string) => {
        const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

        if (!selectedPrompt) return

        props.onPromptSelected(selectedPrompt.template)
    }

    useEffect(() => {
        uploadAIApi<Prompt[]>('/prompts').then(setPrompts)
    }, [])

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder='Selecione um prompt...' />
            </SelectTrigger>

            <SelectContent>
                {prompts?.map((prompt) => (
                    <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}