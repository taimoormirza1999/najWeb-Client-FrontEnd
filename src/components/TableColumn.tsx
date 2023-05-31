export default function TableColumn({ className, children, ...rest }) {
  return (
    <td
      scope="col"
      {...rest}
      className={`${className} px-3 py-3.5 text-left font-semibold text-[#1C1C1C] border-dark-blue border-[1px]`}
    >
      {children}
    </td>
  );
}
