import Layout from "@/app/components/Layout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const GroupDetail = ({ params }: { params: { groupId: string } }) => {
  return (
    <Layout className="!p-0 bg-gray-100 relative">
      <div className="flex justify-between bg-slate-800 p-4 pt-10 py-20 t-0 w-full">
        <ArrowBackIosIcon sx={{ fontSize: "20px" }} />
        <SettingsOutlinedIcon sx={{ fontSize: "20px" }} />
      </div>

      <div className="relative">
        <div className="w-28 h-28 bg-white absolute -top-11 left-14 rounded-xl overflow-hidden ">
          <div className="flex flex-1 w-full h-full bg-green-100 border-solid border-[6px] rounded-xl border-white box-border"></div>
        </div>
      </div>
    </Layout>
  );
};

export default GroupDetail;
