function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ComplaintMessages = ({ complaintMessages }) => {
  return (
    <div className="flex h-[700px] flex-col overflow-y-auto p-3">
      {complaintMessages.map((row, index) => (
        <p
          key={index}
          className={classNames(
            parseInt(row.parent_id, 10) === 0
              ? 'bg-teal-blue self-end text-white'
              : 'self-start bg-white text-dark-blue',
            'border-medium-grey mb-4 w-1/2 rounded-md border p-3 text-[16px] shadow-xl'
          )}
        >
          {row.message}
        </p>
      ))}

      <p className="text-medium-grey absolute bottom-10 text-lg italic">
        * You may also contact our customer service directly at the designated
        numbers
      </p>
    </div>
  );
};

export default ComplaintMessages;
