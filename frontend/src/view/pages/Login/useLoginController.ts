import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";
import { SingninParams } from "../../../app/services/authService/singnin";
import { useAuth } from "../../../app/contexts/hooks/useAuth";
import { useTranslation } from 'react-i18next';

const schema = z.object({
    email: z
        .string()
        .nonempty("E=mail é obrigatório")
        .email("Informe um e-mail válido"),
    password: z
        .string()
        .nonempty("Senha é obrigatória")
        .min(8, "Senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: SingninParams) => {
            return authService.singnin(data);
        },
    });

    const { t } = useTranslation();

    const { singnin } = useAuth();
    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { accessToken } = await mutateAsync(data);
            singnin(accessToken);
        } catch (error) {
            toast.error("Credenciais inválidas!");
        }
    });

    return { handleSubmit, register, errors, isPending, t };
}
