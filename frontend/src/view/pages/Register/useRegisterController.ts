import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";

import { useMutation } from "@tanstack/react-query";
import { SingnupParams } from "../../../app/services/authService/singnup";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/contexts/hooks/useAuth";
import { useTranslation } from "react-i18next";

const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
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

export function useRegisterController() {
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: SingnupParams) => {
            return authService.singnup(data);
        },
    });

    const { t } = useTranslation();

    const { singnin } = useAuth();

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { accessToken } = await mutateAsync(data);

            singnin(accessToken);

            toast.success("Conta criada com sucesso!");
        } catch (error) {
            toast.error("Ocorreu um erro ao criar a sua conta!");
        }
    });

    return { register, errors, handleSubmit, isPending, t };
}
