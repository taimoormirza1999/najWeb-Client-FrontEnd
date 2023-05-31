export default function TableColumn({ className, children, ...rest }) {
  return (
    <td
      scope="col"
      {...rest}
      className={`${className} px-1 py-1 text-left font-semibold text-[#1C1C1C] border-[#01318842] border-[1px]`}
    >
      {children}
    </td>
  );
}
