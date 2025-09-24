import styled from "styled-components";
function TextInputWithLabel({
  elementId,
  label,
  onChange,
  ref,
  value,
}) {
  const StyledLabel = styled.label`
    margin-bottom: 4px;
    display: block;
    padding: 4px 0;
  `;
  const StyledInput = styled.input`
    padding: 4px 8px;
    margin-bottom: 8px;
    display: block;
  `;
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
export default TextInputWithLabel
