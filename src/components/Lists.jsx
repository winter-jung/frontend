import Card from "./Card";

const Lists = ({ items = [], title = "콘텐츠" }) => {
  console.log(items);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-gray-400">
          <p className="text-xl">표시할 콘텐츠가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Lists;
