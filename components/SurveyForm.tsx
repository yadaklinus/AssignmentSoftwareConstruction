"use client";

import React, { useState } from "react";
import {
  Card,
  Input,
  Select,
  ListBox,
  ListBoxItem,
  Label,
  RadioGroup,
  Radio,
  TextArea,
  Button,
  Spinner,
  TextField,
} from "@heroui/react";
import { submitSurvey } from "@/app/actions/survey";
import { CheckCircle2, AlertCircle } from "lucide-react";

const departments = [
  "Computer Science",
  "Business Administration",
  "Engineering",
  "Social Sciences",
  "Medicine",
  "Law",
  "Arts and Humanities",
  "Environmental Science",
];

const genders = ["Male", "Female", "Other"];
const restaurants = ["Polygon", "Ready-Rides"];

export const SurveyForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      gender: formData.get("gender") as string,
      department: formData.get("department") as string,
      restaurantChoice: formData.get("restaurantChoice") as string,
      reason: formData.get("reason") as string,
    };

    if (!data.gender || !data.department || !data.restaurantChoice || !data.reason) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const result = await submitSurvey(data);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "An error occurred.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto bg-blue-50/10 border-blue-500/20">
        <Card.Content className="flex flex-col items-center justify-center py-10 gap-4">
          <CheckCircle2 className="w-16 h-16 text-success" />
          <h2 className="text-2xl font-bold text-blue-600">Thank You!</h2>
          <p className="text-center text-default-500">
            Your response has been recorded. We appreciate your feedback on the school restaurants.
          </p>
          <Button
            className="bg-blue-600 font-bold"
            onPress={() => setSubmitted(false)}
          >
            Submit another response
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-blue-600">
      <Card.Header className="flex flex-col items-start px-8 pt-8">
        <h1 className="text-3xl font-bold text-blue-700">Student Restaurant Choice Survey</h1>
        <p className="text-default-500 mt-2">
          Help us understand the student preferences between Polygon and Ready-Rides.
        </p>
      </Card.Header>
      <Card.Content className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select name="gender" isRequired className="w-full flex flex-col gap-2">
              <Label className="text-blue-700 font-semibold">Gender</Label>
              <Select.Trigger className="flex w-full items-center justify-between px-3 py-2 border-2 border-default-200 rounded-xl hover:border-blue-500 transition-colors bg-white">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="p-1">
                  {genders.map((g) => (
                    <ListBoxItem key={g} id={g} className="px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer">
                      {g}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Select name="department" isRequired className="w-full flex flex-col gap-2">
              <Label className="text-blue-700 font-semibold">Department</Label>
              <Select.Trigger className="flex w-full items-center justify-between px-3 py-2 border-2 border-default-200 rounded-xl hover:border-blue-500 transition-colors bg-white">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="p-1 max-h-60 overflow-y-auto">
                  {departments.map((d) => (
                    <ListBoxItem key={d} id={d} className="px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer">
                      {d}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <RadioGroup name="restaurantChoice" isRequired className="flex flex-col gap-3">
            <Label className="text-blue-700 font-semibold">Which restaurant do you prefer?</Label>
            <div className="flex gap-4">
              {restaurants.map((r) => (
                <Radio key={r} value={r} className="flex-1">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label className="cursor-pointer">{r}</Label>
                  </Radio.Content>
                </Radio>
              ))}
            </div>
          </RadioGroup>

          <TextField className="flex flex-col gap-2">
            <Label className="text-blue-700 font-semibold">Reason for liking</Label>
            <TextArea
              name="reason"
              placeholder="Tell us why you prefer this restaurant..."

              rows={4}
              className="w-full p-3 border-2 border-default-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
            />
          </TextField>

          {error && (
            <div className="flex items-center gap-2 text-danger text-sm p-3 bg-danger-50 rounded-lg">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30"
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Submit Response"}
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};
