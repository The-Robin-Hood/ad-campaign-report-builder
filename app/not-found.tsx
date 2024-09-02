import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page",
};

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  );
};

export default ErrorPage;
