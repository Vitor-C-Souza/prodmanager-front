import { X } from 'lucide-react';

interface Props {
    title: string;
    subtitle: string;
    onClose: () => void;
}

export const ModalHeader = ({ title, subtitle, onClose }: Props) => (
    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
            <h2 className="text-xl font-black text-slate-900 leading-none">{title}</h2>
            <p className="text-sm text-blue-600 font-bold mt-1.5 uppercase tracking-wider">{subtitle}</p>
        </div>
        <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
            <X size={20} />
        </button>
    </div>
);