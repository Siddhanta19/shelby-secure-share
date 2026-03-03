"use client";

import { useState } from "react";
import { AccountBlobs } from "@/components/AccountBlobs";
import { FileUpload } from "@/components/FileUpload";
import { Header } from "@/components/Header";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen p-5">
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto space-y-8 mt-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Secure File Sharing
            </h1>
            <p className="text-lg text-muted-foreground w-2/3 mx-auto">
              Upload any file to the decentralized Shelby Protocol.
              Share the generated link securely.
            </p>
          </div>

          <FileUpload onUploadSuccess={handleUploadSuccess} />
          <AccountBlobs refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}
