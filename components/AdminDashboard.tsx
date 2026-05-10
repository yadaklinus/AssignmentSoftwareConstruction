"use client";

import React from "react";
import {
  Card,
  Table,
  Tabs,
} from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { List, BarChart3 } from "lucide-react";

interface Response {
  id: string;
  gender: string;
  department: string;
  restaurantChoice: string;
  reason: string;
  createdAt: Date;
}

interface DashboardProps {
  responses: Response[];
}

const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#ca8a04"];

export const AdminDashboard = ({ responses }: DashboardProps) => {
  // Process data for charts
  const restaurantData = [
    { name: "Polygon", value: responses.filter(r => r.restaurantChoice === "Polygon").length },
    { name: "Ready-Rides", value: responses.filter(r => r.restaurantChoice === "Ready-Rides").length },
  ];

  const genderData = [
    { name: "Male", value: responses.filter(r => r.gender === "Male").length },
    { name: "Female", value: responses.filter(r => r.gender === "Female").length },
    { name: "Other", value: responses.filter(r => r.gender === "Other").length },
  ];

  const deptCounts: Record<string, number> = {};
  responses.forEach(r => {
    deptCounts[r.department] = (deptCounts[r.department] || 0) + 1;
  });
  const departmentData = Object.entries(deptCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
          <p className="text-default-500">Total Responses: {responses.length}</p>
        </div>
      </div>

      <Tabs aria-label="Dashboard Options">
        <Tabs.ListContainer>
          <Tabs.List>
            <Tabs.Tab id="analytics">
              <div className="flex items-center space-x-2">
                <BarChart3 size={20} />
                <span>Analytics</span>
              </div>
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="responses">
              <div className="flex items-center space-x-2">
                <List size={20} />
                <span>All Responses</span>
              </div>
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card className="h-[400px]">
              <Card.Header className="flex flex-col items-start px-6 pt-6">
                <h3 className="text-lg font-semibold text-blue-700">Restaurant Preference</h3>
              </Card.Header>
              <Card.Content>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={restaurantData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {restaurantData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Content>
            </Card>

            <Card className="h-[400px]">
              <Card.Header className="flex flex-col items-start px-6 pt-6">
                <h3 className="text-lg font-semibold text-blue-700">Gender Distribution</h3>
              </Card.Header>
              <Card.Content>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Content>
            </Card>

            <Card className="col-span-1 md:col-span-2 h-[450px]">
              <Card.Header className="flex flex-col items-start px-6 pt-6">
                <h3 className="text-lg font-semibold text-blue-700">Department Breakdown</h3>
              </Card.Header>
              <Card.Content>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical" margin={{ left: 50, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Panel>

        <Tabs.Panel id="responses">
          <Card className="mt-4">
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Survey Responses Table" selectionMode="none">
                  <Table.Header>
                    <Table.Column>DATE</Table.Column>
                    <Table.Column>GENDER</Table.Column>
                    <Table.Column>DEPARTMENT</Table.Column>
                    <Table.Column>CHOICE</Table.Column>
                    <Table.Column>REASON</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {responses.map((r) => (
                      <Table.Row key={r.id}>
                        <Table.Cell>{new Date(r.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>{r.gender}</Table.Cell>
                        <Table.Cell>{r.department}</Table.Cell>
                        <Table.Cell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.restaurantChoice === "Polygon" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                            }`}>
                            {r.restaurantChoice}
                          </span>
                        </Table.Cell>
                        <Table.Cell className="max-w-xs truncate">{r.reason}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
