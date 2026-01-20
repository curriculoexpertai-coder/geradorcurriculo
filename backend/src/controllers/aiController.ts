import { FastifyReply, FastifyRequest } from 'fastify';
import { generateText } from '../services/aiService';
import { z } from 'zod';

export async function generateContent(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        currentText: z.string(),
        style: z.enum(['professional', 'executive', 'creative']),
        section: z.string().optional()
    });

    try {
        const { currentText, style, section } = schema.parse(request.body);

        let prompt = "";

        if (section === 'summary') {
            prompt = `Aja como um especialista em currículos e recrutamento. Reescreva o seguinte texto de Resumo Profissional para torná-lo mais ${getStyleDescription(style)}.
             Texto original: "${currentText}"
             
             Regras:
             - Mantenha a verdade, apenas melhore a escrita.
             - Seja direto e impactante.
             - Use palavras-chave fortes.
             - Retorne APENAS o texto reescrito, sem explicações ou aspas.`;
        } else if (section === 'experience') {
            prompt = `Aja como um recrutador sênior. Melhore a seguinte descrição de experiência profissional para torná-la mais impactante (estilo ${style}).
             Texto original: "${currentText}"

             Regras:
             - Use o método STAR (Situação, Tarefa, Ação, Resultado) implicitamente.
             - Comece frases com verbos de ação fortes.
             - Quantifique resultados sempre que possível (mesmo que precise usar placeholders como [X%]).
             - Remova clichês passivos.
             - Mantenha aprox. o mesmo tamanho.
             - Retorne APENAS o texto reescrito.`;
        } else {
            // Fallback genérico
            prompt = `Melhore o seguinte texto para um currículo com tom ${style}: "${currentText}". Retorne apenas o texto melhorado.`;
        }

        const enhancedText = await generateText(prompt);
        reply.send({ text: enhancedText });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Dados inválidos', issues: error.format() });
        }
        console.error(error);
        reply.status(500).send({ message: 'Erro ao gerar conteúdo com IA' });
    }
}

function getStyleDescription(style: string) {
    switch (style) {
        case 'professional': return "formal, claro e focado em competências técnicas";
        case 'executive': return "estratégico, focado em resultados, liderança e impacto de negócios (tom C-level)";
        case 'creative': return "inovador, envolvente e que mostre personalidade (ideal para design/marketing)";
        default: return "profissional";
    }
}
