"use client"
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
import { FormEvent, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
type SignUpCardProps = {
  setSignInFlow: React.Dispatch<React.SetStateAction<signInFlow>>;
};

export default function SignUpCard({ setSignInFlow }: SignUpCardProps) {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

  const handlePasswordSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      setError("Email field is required");
      return;
    }
    if (password === "") {
      setError("Password field is required");
      return;
    }
    if (name === "") {
      setError("Name field is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    setPending(true);

    try {


      const res = await fetch(process.env.NEXT_PUBLIC_RENTAL_API_URL + "/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { name: name, email: email, password: password, role: "USER" }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const user = await res.json();
      setSignInFlow("signIn");
      router.push("/");

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setPending(false);
    }
  };
  return (
    <div>
      <Card className="mx-auto max-w-sm border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your email below to sign up</CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 rounded-md mx-6 px-3 py-2 text-destructive flex items-center gap-2 text-sm mb-4">
            <FaExclamationTriangle />
            {error}
          </div>
        )}
        <CardContent>
          <div className="grid gap-4 ">
            <form className="space-y-4" onSubmit={handlePasswordSignUp}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  disabled={pending}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  required
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  disabled={pending}
                  id="confirmPassword"
                  type="password"
                  placeholder="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button disabled={pending} type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span>or</span>
              <Separator className="flex-1" />
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setSignInFlow("signIn")}
            >
              Sign in
            </Button>
            <div className="text-center text-sm">
              <Button
                variant={"link"}
                className="p-0"
                onClick={() => setSignInFlow("adminSignUp")}
              >
                Sign Up as Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}