"use client";
import React from "react";
import {
  Tabs as SubTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import IconButton from "@/components/shared/IconButton";
import Link from "next/link";
import { Tabs } from "flowbite-react";

const JoinedCourses = () => {
  return (
    <div className="mt-3">
      <SubTabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </SubTabs>
    </div>
  );
};

export default JoinedCourses;