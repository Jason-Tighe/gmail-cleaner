type GmailLabel = {
    id: string;
    name: string;
};

type LabelProps = {
    labels: GmailLabel[];
    selected: string[];
    onSelect: (selectedIds: string[]) => void;
};

export default function Label({ labels, selected, onSelect }: LabelProps) {
    const toggleLabel = (id: string) => {
        if (selected.includes(id)) {
            onSelect(selected.filter((labelId) => labelId !== id));
        } else {
            onSelect([...selected, id]);
        }
    };

    if (!labels || labels.length === 0) {
        return <p className="text-gray-500">No labels found.</p>;
    }

    return (
        <div className="w-full max-w-xl flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
                {labels.map(({ id, name }) => {
                    const isSelected = selected.includes(id);
                    return (
                        <button
                            key={id}
                            onClick={() => toggleLabel(id)}
                            className={`transition-all duration-200 text-xs font-medium px-3 py-1 rounded-full shadow-sm border focus:outline-none
                            ${
                                isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }
                            hover:scale-105 active:scale-95`}
                        >
                            {name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
