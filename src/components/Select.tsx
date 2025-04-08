interface SelectProperties {
  onChange: (value:string) => void,
  options: Array<{ label: string, value: number | string }>
}

const Select = ({ onChange, options }: SelectProperties) => (
  <select
    onChange={(event) => onChange(event.target.value)}
    className="border-1 rounded-md px-4"
  >
    {
      options.map((time) => (
        <option
          key={time.value}
          value={time.value}
        >
          { time.label }
        </option>
      ))
    }
  </select>
);

export default Select;
