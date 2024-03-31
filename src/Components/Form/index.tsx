import { TableFormData } from "@/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface FormProps {
  setFormData: Dispatch<SetStateAction<TableFormData[]>>;
  formData: TableFormData[];
  positions?: any;
  mode: "add" | "edit" | "view" | "";
  mark?: TableFormData;
}

const Form: React.FC<FormProps> = ({
  setFormData,
  formData,
  positions,
  mode,
  mark,
}) => {
  const [data, setData] = useState<TableFormData>({
    nickName: "",
    address: "",
  });
  const [nickNameError, setNickNameError] = useState("");

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      mark && setData(mark);
      setNickNameError("");
    }
  }, [mark, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setNickNameError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.nickName) {
      setNickNameError("Nickname cannot be empty");
      return;
    }

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    const uniqueId = Date.now().toString();

    const newData = {
      ...data,
      date: `${day}-${month}-${year}`,
      time: time,
      positions: positions,
    };

    if (mode === "edit") {
      const updatedFormData: TableFormData[] = formData.map((item) =>
        item.id === mark?.id ? { ...newData, id: mark!.id } : item
      );
      setFormData(updatedFormData);
    } else {
      newData.id = uniqueId;
      setFormData([...formData, newData]);
    }
  };

  return (
    <div className="w-150 h-100">
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid place-items-center gap-x-4 gap-y-4"
      >
        {mode === "view" ? (
          <div>{data.nickName}</div>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Nick Name"
              name="nickName"
              value={data.nickName}
              onChange={handleChange}
              className="border"
            />
            {nickNameError && (
              <p className="absolute top-0 left-0 mt-2 text-red-500 text-xs">
                {nickNameError}
              </p>
            )}
          </div>
        )}
        {mode === "view" ? (
          <div>{data.address}</div>
        ) : (
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="border"
          />
        )}
        {mode !== "view" && (
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
