import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white">Dados Pessoais</h3>
                <p className="text-sm text-zinc-400">
                    Estas informações aparecerão no cabeçalho do seu currículo.
                </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <PersonalInfoForm />
            </div>
        </div>
    );
}
