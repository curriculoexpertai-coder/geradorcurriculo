"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const experienceSchema = z.object({
    experiences: z.array(z.object({
        id: z.string().optional(),
        title: z.string().min(2, "Cargo é obrigatório"),
        company: z.string().min(2, "Empresa é obrigatória"),
        location: z.string().optional(),
        startDate: z.string().min(1, "Data de início é obrigatória"),
        endDate: z.string().optional(),
        currentJob: z.boolean().default(false),
        description: z.string().optional(),
    }))
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile, getUserProfile } from "@/services/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export function ExperienceForm() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            experiences: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "experiences",
    });

    useEffect(() => {
        async function loadExperiences() {
            if (!user) return;
            const data = await getUserProfile(user.uid);
            if (data?.profile?.experiences) {
                // Formatar datas para o input type="month" (YYYY-MM)
                const formattedExps = data.profile.experiences.map((exp: any) => ({
                    ...exp,
                    startDate: exp.startDate ? new Date(exp.startDate).toISOString().slice(0, 7) : "",
                    endDate: exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 7) : "",
                }));
                form.reset({ experiences: formattedExps });
            }
            setIsLoading(false);
        }
        loadExperiences();
    }, [user, form]);

    async function onSubmit(values: ExperienceFormValues) {
        if (!user) return;

        const promise = updateUserProfile(user.uid, values);

        toast.promise(promise, {
            loading: 'Salvando experiências...',
            success: 'Experiências atualizadas!',
            error: 'Erro ao salvar experiências.',
        });
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-20 w-full bg-zinc-800" />
                <Skeleton className="h-40 w-full bg-zinc-800" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white">Experiência Profissional</h3>
                        <p className="text-sm text-zinc-400">Adicione suas experiências de trabalho recentes.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="bg-zinc-900/40 border-zinc-800 overflow-hidden group">
                            <CardHeader className="flex flex-row items-center justify-between py-3 bg-zinc-800/20">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                                        {index + 1}
                                    </div>
                                    Experiência {index + 1}
                                </CardTitle>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`experiences.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cargo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Desenvolvedor Senior" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`experiences.${index}.company`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Empresa</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nome da empresa" {...field} className="bg-zinc-950 border-zinc-800" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`experiences.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Início</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input type="month" {...field} className="bg-zinc-950 border-zinc-800" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`experiences.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data Fim</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="month"
                                                        {...field}
                                                        disabled={form.watch(`experiences.${index}.currentJob`)}
                                                        className="bg-zinc-950 border-zinc-800 disabled:opacity-30"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`experiences.${index}.currentJob`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-zinc-800 p-4 pt-8 h-[74px]">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-xs font-medium text-zinc-400">
                                                        Emprego atual
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição das atividades</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva suas principais responsabilidades e conquistas..."
                                                    className="bg-zinc-950 border-zinc-800 h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-dashed border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/5"
                        onClick={() => append({
                            title: "",
                            company: "",
                            startDate: "",
                            currentJob: false
                        })}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Experiência
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-auto">
                        Salvar Experiências
                    </Button>
                </div>
            </form>
        </Form>
    );
}
