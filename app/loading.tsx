import PreLoader from "@/components/common/preloader";

export default function Loading() {
  return (
    <div className='z-50 flex h-screen items-center justify-center'>
      <PreLoader />
    </div>
  );
}
