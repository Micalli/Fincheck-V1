import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";
import { Input } from "../../components/Input";

export const Login = () => {
    const { handleSubmit, register, errors, isPending, t } = useLoginController();
    return (
        <>
            <header className=" flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
                    {t("login.loginTitle")}
                </h1>

                <p className="space-x-2">
                    <span className="text-gray-700 tracking-[-0.5px]">
                        {t("login.loginSuggestion")}
                    </span>
                    <Link
                        to="/register"
                        className="tracking-[-0.5px] text-teal-900 font-medium"
                    >
                        {t("login.createAccountSuggestion")}
                    </Link>
                </p>
            </header>

            <form
                className="mt-[60px] flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <Input
                    type="email"
                    placeholder="E-mail"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Input
                    type="password"
                    placeholder={t("placeholders.password")}
                    error={errors.password?.message}
                    {...register("password")}
                />
                <Button type="submit" className="mt-2" isLoading={isPending}>
                    {t("login.loginButton")}
                </Button>
            </form>
        </>
    );
};
