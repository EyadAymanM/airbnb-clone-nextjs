import { Field } from "formik";
import { useLocale } from "next-intl";

const InputField = ({ id, name, type, label, icon: Icon }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className={`w-full relative flex ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder=" "
        className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-xl transition border-neutral-400 focus:border-neutral-800 focus:outline-none"
      />
      <label
        htmlFor={id}
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
          ${isRTL ? 'right-4' : 'left-4'}
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:-translate-y-4 peer-focus:scale-75
        `}
      >
        {label}
      </label>
      {Icon && (
        <Icon className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-5 text-gray-400`} />
      )}
    </div>
  );
};

export default InputField;