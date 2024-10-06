
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInFlow } from "../types";
import { FaExclamationTriangle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInCardProps = {
    setSignInFlow: React.Dispatch<React.SetStateAction<signInFlow>>;
    onAuthSuccess: () => void;
  };
  
export default function SignInCard({ setSignInFlow, onAuthSuccess }: SignInCardProps) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError("");
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [error])

    const handlePasswordSignIn = (e: FormEvent) => {
        e.preventDefault();
        if (email === "") {
          setError("Email field is required");
          return;
        }
        if (password === "") {
          setError("Password field is required");
          return;
        }
    
        setPending(true);
        signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        })
        .then((callback) => {
            if(callback?.ok){
                onAuthSuccess();
                router.refresh();
            }
            if(callback?.error){
                setError("Invalid email or password");
            }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setPending(false));
        
      };
    
    
      return (
        <div>
          <Card className="mx-auto max-w-sm border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email below to sign in to your account
              </CardDescription>
            </CardHeader>
            {!!error && (
              <div className="bg-destructive/15 rounded-md mx-6 px-3 py-2 text-destructive flex items-center gap-2 text-sm mb-4">
                <FaExclamationTriangle />
                {error}
              </div>
            )}
            <CardContent>
              <div className="grid gap-4">
                <form className="space-y-4" onSubmit={handlePasswordSignIn}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      disabled={pending}
                      id="email"
                      type="email"
                      placeholder="mygmail@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      disabled={pending}
                      id="password"
                      type="password"
                      placeholder="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button disabled={pending} type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span>or</span>
                  <Separator className="flex-1" />
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <div className="flex flex-col gap-2">

                </div>
                <div className="flex flex-row justify-center gap-2">
                <Button
                  variant={"link"}
                  className="p-0"
                  onClick={() => setSignInFlow("signUp")}
                >
                  Sign up
                </Button>
                <Button
                  variant={"link"}
                  className="p-0"
                  onClick={() => setSignInFlow("adminSignUp")}
                >
                  Sign up as admin
                </Button>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }