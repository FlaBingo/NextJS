import Image from "next/image"

export const metadata = {
  title: "Page Not Found"
}

export default function NotFound(){
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={"/not-found-img.avif"} alt="Page Not Found" width={600} height={600}/>
    </div>
  )
}