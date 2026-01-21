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

export async function analyzeJob(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        resumeData: z.any(),
        jobDescription: z.string()
    });

    try {
        const { resumeData, jobDescription } = schema.parse(request.body);

        const prompt = `
        Analise o currículo abaixo em relação à descrição da vaga fornecida.
        Retorne APENAS um objeto JSON válido com a seguinte estrutura:
        {
            "score": (número de 0 a 100),
            "summary": "resumo conciso da compatibilidade",
            "pros": ["ponto forte 1", "ponto forte 2"],
            "cons": ["o que falta ou pode melhorar 1"],
            "missingKeywords": ["keyword1", "keyword2"],
            "suggestions": ["sugestão de ajuste 1"]
        }

        CURRÍCULO:
        ${JSON.stringify(resumeData)}

        DESCRIÇÃO DA VAGA:
        ${jobDescription}
        `;

        const response = await generateText(prompt);

        // Tenta extrair o JSON da resposta (Gemini as vezes coloca ```json ... ```)
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response);

        reply.send(analysis);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Dados inválidos', issues: error.format() });
        }
        console.error("Erro na análise de vaga:", error);
        reply.status(500).send({ message: 'Erro ao analisar vaga com IA' });
    }
}

export async function generateCoverLetter(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
        resumeData: z.any(),
        jobDescription: z.string()
    });

    try {
        const { resumeData, jobDescription } = schema.parse(request.body);

        const prompt = `
        Aja como um especialista em escrita profissional e recrutamento. 
        Escreva uma Carta de Apresentação (Cover Letter) altamente persuasiva e personalizada.
        
        DADOS DO CANDIDATO:
        ${JSON.stringify(resumeData)}

        VAGA DESEJADA:
        ${jobDescription}

        DIRETRIZES:
        - Use um tom profissional, mas entusiasmado.
        - Conecte as experiências mais relevantes do candidato com os requisitos da vaga.
        - Destaque resultados quantificáveis mencionados no currículo.
        - Mantenha um tamanho de 3 a 4 parágrafos (aprox. 300-400 palavras).
        - Inclua saudações formais e encerramento.
        - Retorne APENAS o texto da carta, sem comentários adicionais ou aspas.
        `;

        const letter = await generateText(prompt);
        reply.send({ letter });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Dados inválidos', issues: error.format() });
        }
        console.error("Erro ao gerar carta:", error);
        reply.status(500).send({ message: 'Erro ao gerar carta com IA' });
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
