export default function Heading({ title, subtitle }) {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs_text">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
  );
}
