import React from "react";
import TransText from "@components/TransText";

const OrgTypeSelectorModal = ({ open, onClose, onSelect }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-[min(90vw,720px)]">
                <h2 className="text-xl font-bold text-alpha mb-4">
                    Organization Type
                </h2>
                <select onChange={(e) => onSelect(e.target.value)} className="mb-4 w-full p-3 border border-alpha rounded focus:outline-none focus:ring-2 focus:ring-beta">
                    <option value="">-- Select a type --</option>
                    <option value="osc">Civil Society Organization (CSO)</option>
                    <option value="bailleurs">Funding Organization</option>
                    <option value="entreprises">Private Sector Company</option>
                    <option value="agences">UN Agency and International Cooperation</option>
                    <option value="publiques">Public Institution</option>
                    <option value="academiques">Academic and Research Institution</option>
                </select>
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Close" ar="إغلاق" fr="Fermer" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrgTypeSelectorModal;


