"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().max(500, {
        message: "Bio não pode ter mais de 500 caracteres.",
    }).optional(),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    portfolioUrl: z.string().url().optional().or(z.literal("")),
});

import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile, getUserProfile } from "@/services/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// ... schema remains the same ...

export function PersonalInfoForm() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            location: "",
            bio: "",
            linkedinUrl: "",
            portfolioUrl: "",
        },
    });

    useEffect(() => {
        async function loadProfile() {
            if (!user) return;
            const data = await getUserProfile(user.uid);
            if (data) {
                form.reset({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.profile?.phone || "",
                    location: data.profile?.location || "",
                    bio: data.profile?.bio || "",
                    linkedinUrl: data.profile?.linkedinUrl || "",
                    portfolioUrl: data.profile?.portfolioUrl || "",
                });
            }
            setIsLoading(false);
        }
        loadProfile();
    }, [user, form]);

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        if (!user) return;

        const promise = updateUserProfile(user.uid, values);

        toast.promise(promise, {
            loading: 'Salvando dados...',
            success: 'Perfil atualizado com sucesso!',
            error: 'Erro ao atualizar perfil.',
        });
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-full bg-zinc-800" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full bg-zinc-800" />
                    <Skeleton className="h-10 w-full bg-zinc-800" />
                </div>
                <Skeleton className="h-32 w-full bg-zinc-800" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="seu@email.com" {...field} disabled />
                                </FormControl>
                                <FormDescription>
                                    O email não pode ser alterado.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="(11) 99999-9999" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                                <Input placeholder="Cidade, Estado" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resumo Profissional (Bio)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Conte um pouco sobre você..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Um breve resumo que aparecerá no topo do seu currículo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://linkedin.com/in/voce" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="portfolioUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Portfólio / Site</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://seu-portfolio.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Salvar Alterações</Button>
            </form>
        </Form>
    )
}
