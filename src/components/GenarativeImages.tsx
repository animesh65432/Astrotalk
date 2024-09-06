import React from "react";
import Image from "next/image";

type Props = {
  photourl: string;
};

const GenarativeImages: React.FC<Props> = ({ photourl }) => {
  return (
    <div className="mt-6 flex justify-center items-center">
      <div className="relative w-full sm:w-[600px] lg:w-[800px] h-80 sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl ring-2 ring-indigo-500 ring-opacity-50">
        <Image
          src={photourl}
          alt="Generated Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default GenarativeImages;
