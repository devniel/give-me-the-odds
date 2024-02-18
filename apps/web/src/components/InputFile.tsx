import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { ChangeEvent } from "react";

export const InputFile = ({ onChange }: { onChange: (file: File) => void }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };
  return (
    <label
      htmlFor="input-file"
      className="inline-flex items-center rounded-xl border-yellow-400 border-2 px-6 py-4 text-2xl text-white cursor-pointer hover:bg-yellow-400 hover:text-yellow-800"
    >
      <ArrowUpTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      <span className="uppercase">Upload Empire plans</span>
      <input
        id="input-file"
        className="hidden"
        type="file"
        accept=".json"
        onChange={handleOnChange}
      />
    </label>
  );
};
