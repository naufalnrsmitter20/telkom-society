export default function Notification() {
  return (
    <div className="w-screen h-screen pt-40 justify-center flex ">
      <div className="w-5/6 h-3/5">
        <div className="p-6 bg-white justify-between items-center flex drop-shadow rounded-[12px]">
          <div className="flex">
            <p className="text-[16px] font-normal m-6">
              Jean Richnerd Rantabaratrahjaga
            </p>
            <h6 className="text-[16px] font-medium m-6 text-[#F45846]">
              Xrpl 6
            </h6>
            <p className="text-[16px] font-normal m-6">Hacker</p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">Invite You In Grounded</h1>
          </div>
          <div className="flex items-center">
            <button className="rounded-full flex justify-center items-center bg-highlight text-white p-6 m-3"> Accept </button>
            <button className="rounded-full flex justify-center items-center border-2 border-highlight text-highlight p-6 m-3"> Decline </button>
          </div>
        </div>
      </div>
    </div>
  );
}
