export default function RoomingDivider({ eventName }: { eventName: string }) {
  // eslint-disable-next-line react-hooks/purity
  const isGreen = Math.floor(Math.random() * 2) === 0;

  return (
    <div className="flex items-center gap-10">
      <hr className={`my-4 border-t w-full ${isGreen ? 'border-green-500' : 'border-purple-500'}`} />
      <h2 className={`text-lg text-center font-semibold mb-4 border w-70 p-1 ${isGreen ? 'text-green-600 border-green-500 bg-green-100' : 'text-purple-600 border-purple-500 bg-purple-100'}`}>{eventName}</h2>
      <hr className={`my-4 border-t w-full ${isGreen ? 'border-green-500' : 'border-purple-500'}`} />
    </div>
  );
}
