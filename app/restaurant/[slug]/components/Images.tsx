export default function Images({ Images }: { Images: string[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">{Images.length} photo{Images.length>1 ? "s": ""}</h1>
      <div className="flex flex-wrap">
        {Images.map((image, i) => {
          return (
            <img
              key={i}
              className="w-56 h-44 mr-1 mb-1"
              src={image}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}
