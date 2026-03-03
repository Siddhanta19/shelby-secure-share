import { useWallet } from "@aptos-labs/wallet-adapter-react";
import type { BlobMetadata } from "@shelby-protocol/sdk/browser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getShelbyClient } from "@/utils/client";

interface AccountBlobsProps {
    refreshTrigger?: number;
}

export const AccountBlobs = ({ refreshTrigger }: AccountBlobsProps) => {
    const { account } = useWallet();
    const [blobs, setBlobs] = useState<BlobMetadata[]>([]);

    useEffect(() => {
        if (!account) {
            setBlobs([]);
            return;
        }
        const getBlobs = async (): Promise<BlobMetadata[]> => {
            const blobs = await getShelbyClient().coordination.getAccountBlobs({
                account: account.address,
            });
            return blobs;
        };

        getBlobs().then((blobs) => {
            setBlobs(blobs);
        }).catch((err) => {
            console.error("Failed to fetch blobs:", err);
        });
    }, [account, refreshTrigger]);

    const extractFileName = (blobName: string): string => {
        return blobName.split("/").pop() || blobName;
    };

    const isImageFile = (filename: string): boolean => {
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const extension = filename.split(".").pop()?.toLowerCase();
        return extension ? imageExtensions.includes(extension) : false;
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-background">
            {!account && (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                        Please connect your wallet to view blobs
                    </p>
                </div>
            )}
            {account && blobs.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                        No blobs found for this account. Upload a file to get started!
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blobs.map((blob) => (
                    <div
                        key={blob.name}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 p-2">
                            <div className="h-full relative">
                                {isImageFile(extractFileName(blob.name)) ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SHELBY_API_URL
                                            }/v1/blobs/${blob.owner.toString()}/${extractFileName(
                                                blob.name,
                                            )}`}
                                        alt={blob.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            borderRadius: "4px",
                                        }}
                                        width={100}
                                        height={100}
                                        onError={(e) => {
                                            console.error("Image failed to load:", e);
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded"
                                        style={{
                                            borderRadius: "4px",
                                        }}
                                    >
                                        <div className="text-center p-4">
                                            <div className="text-gray-400 dark:text-gray-500 mb-2" />
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 break-words">
                                                {extractFileName(blob.name)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 space-y-3">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                                {extractFileName(blob.name)}
                            </h3>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Owner:
                                    </span>
                                    <p className="font-mono text-xs bg-gray-50 dark:bg-gray-700 p-1 rounded mt-1 break-all">
                                        {blob.owner.toString()}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_SHELBY_API_URL
                                            }/v1/blobs/${blob.owner.toString()}/${extractFileName(
                                                blob.name,
                                            )}`}
                                        className="flex-1 text-center bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 py-1.5 px-3 rounded text-xs font-medium transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open File
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `${process.env.NEXT_PUBLIC_SHELBY_API_URL
                                                }/v1/blobs/${blob.owner.toString()}/${extractFileName(
                                                    blob.name,
                                                )}`
                                            );
                                            alert("Link copied to clipboard!");
                                        }}
                                        className="flex-1 text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-1.5 px-3 rounded text-xs font-medium transition-colors"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
