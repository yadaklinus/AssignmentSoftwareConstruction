"use client";

import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-2xl">
        <Card.Header className="flex flex-col items-center gap-2 pt-10">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-blue-700">Admin Login</h1>
          <p className="text-default-500">Enter credentials to access dashboard</p>
        </Card.Header>
        <Card.Content className="p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-danger text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="bg-blue-600 font-bold"
              fullWidth
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
