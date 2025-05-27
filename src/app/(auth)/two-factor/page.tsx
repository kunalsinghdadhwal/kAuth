"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [backupCode, setBackupCode] = useState("");

  const router = useRouter();

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Please enter a complete 6-digit code");
      return;
    }

    setIsVerifying(true);

    const { data, error } = await authClient.twoFactor.verifyTotp({
      code,
    });

    setIsVerifying(false);
  };

  const handleResend = async () => {
    setIsResending(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    alert("New verification code sent to your authenticator app");
  };

  const handleBackupCodeVerify = async () => {
    if (backupCode.length < 8) {
      toast.error("Please enter a valid backup code");
      return;
    }

    setIsVerifying(true);

    setIsVerifying(false);
  };

  const handleBack = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-light text-white tracking-tight">
            Verification Required
          </h1>
          <p className="text-gray-400 text-base font-light">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm">
          <CardHeader className="text-center space-y-1 pb-4">
            <CardTitle className="text-white text-xl font-light">
              Enter Verification Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* OTP Input */}
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[0] = value;
                      setCode(newCode.join(""));
                      // Auto-focus next input
                      const nextInput = (e.target as HTMLInputElement)
                        .parentElement?.children[1] as HTMLInputElement;
                      if (nextInput && value) nextInput.focus();
                    } else {
                      const newCode = code.split("");
                      newCode[0] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      // Focus previous input on backspace
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[0] as HTMLInputElement;
                      if (prevInput && prevInput !== e.target)
                        prevInput.focus();
                    }
                  }}
                  value={code[0] || ""}
                />
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[1] = value;
                      setCode(newCode.join(""));
                      const nextInput = (e.target as HTMLInputElement)
                        .parentElement?.children[2] as HTMLInputElement;
                      if (nextInput && value) nextInput.focus();
                    } else {
                      const newCode = code.split("");
                      newCode[1] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[0] as HTMLInputElement;
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  value={code[1] || ""}
                />
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[2] = value;
                      setCode(newCode.join(""));
                      const nextInput = (e.target as HTMLInputElement)
                        .parentElement?.children[3] as HTMLInputElement;
                      if (nextInput && value) nextInput.focus();
                    } else {
                      const newCode = code.split("");
                      newCode[2] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[1] as HTMLInputElement;
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  value={code[2] || ""}
                />
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[3] = value;
                      setCode(newCode.join(""));
                      const nextInput = (e.target as HTMLInputElement)
                        .parentElement?.children[4] as HTMLInputElement;
                      if (nextInput && value) nextInput.focus();
                    } else {
                      const newCode = code.split("");
                      newCode[3] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[2] as HTMLInputElement;
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  value={code[3] || ""}
                />
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[4] = value;
                      setCode(newCode.join(""));
                      const nextInput = (e.target as HTMLInputElement)
                        .parentElement?.children[5] as HTMLInputElement;
                      if (nextInput && value) nextInput.focus();
                    } else {
                      const newCode = code.split("");
                      newCode[4] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[3] as HTMLInputElement;
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  value={code[4] || ""}
                />
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 text-xl font-medium text-center bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value) {
                      const newCode = code.split("");
                      newCode[5] = value;
                      setCode(newCode.join(""));
                    } else {
                      const newCode = code.split("");
                      newCode[5] = "";
                      setCode(newCode.join(""));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.currentTarget.value) {
                      const prevInput = (e.target as HTMLInputElement)
                        .parentElement?.children[4] as HTMLInputElement;
                      if (prevInput) prevInput.focus();
                    }
                  }}
                  value={code[5] || ""}
                />
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={() => {
                toast.promise(handleVerify, {
                  loading: "Verifying...",
                  success: "Code verified successfully!",
                  error: "Error verifying code. Please try again.",
                });
              }}
              disabled={code.length !== 6 || isVerifying}
              className="w-full h-11 text-base font-medium bg-white text-black hover:bg-gray-100 disabled:bg-white/10 disabled:text-white/40 transition-all duration-200"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>

            {/* Help Text */}
            <div className="text-center space-y-3">
              <Dialog
                open={showBackupDialog}
                onOpenChange={setShowBackupDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={isResending}
                    className="text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 font-light"
                  >
                    Use backup codes instead
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Enter Backup Code
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Enter one of your backup recovery codes to verify your
                      identity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Enter backup code"
                      value={backupCode}
                      onChange={(e) => {
                        setBackupCode(e.target.value);
                      }}
                      className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-white/10"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleBackupCodeVerify}
                        disabled={!backupCode || isVerifying}
                        className="flex-1 bg-white text-black hover:bg-gray-100 disabled:bg-white/10 disabled:text-white/40"
                      >
                        {isVerifying ? "Verifying..." : "Verify"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowBackupDialog(false);
                          setBackupCode("");
                        }}
                        className="border-white/10 text-white hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 font-light"
          >
            Back to login
          </Button>

          <p className="text-xs text-gray-600 font-light">
            Code expires in 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
