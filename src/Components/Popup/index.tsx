import React, { Dispatch, SetStateAction } from "react";
import Map from "../Map";
import { TableFormData } from "@/types";

// const Map = dynamic(() => import('../Map'), { ssr: false });

interface PopupProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<TableFormData[]>>;
  formData: TableFormData[];
  mode: "add" | "edit" | "view" | "";
  editMarkerData?: any;
}

const Popup: React.FC<PopupProps> = ({
  setIsOpen,
  setFormData,
  formData,
  mode,
  editMarkerData,
}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-full max-w-screen-md p-10 bg-white rounded-lg shadow-lg">
         <Map
          setFormData={setFormData}
          formData={formData}
          mode={mode}
          editMarkerData={editMarkerData}
        />
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded focus:ring-4 focus:ring-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
