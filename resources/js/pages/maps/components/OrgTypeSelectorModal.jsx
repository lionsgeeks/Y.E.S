import React from "react";
import TransText from "@components/TransText";

const OrgTypeSelectorModal = ({ open, onClose, onSelect }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-[min(90vw,720px)]">
                <h2 className="text-xl font-bold text-alpha mb-4">
                    <TransText en="Organization Type" ar="نوع المنظمة" fr="Type d'organisation" />
                </h2>
                <select onChange={(e) => onSelect(e.target.value)} className="mb-4 w-full p-3 border border-alpha rounded focus:outline-none focus:ring-2 focus:ring-beta">
                    <option value="">
                        <TransText en="-- Select a type --" ar="-- اختر نوعًا --" fr="-- Sélectionner un type --" />
                    </option>
                    <option value="osc">
                        <TransText en="Civil Society Organization (CSO)" ar="منظمة المجتمع المدني" fr="Organisation de la Société Civile (OSC)" />
                    </option>
                    <option value="bailleurs">
                        <TransText en="Funding Organization" ar="جهة التمويل" fr="Bailleur de Fonds" />
                    </option>
                    <option value="entreprises">
                        <TransText en="Private Sector Company" ar="شركة القطاع الخاص" fr="Entreprise du Secteur Privé" />
                    </option>
                    <option value="agences">
                        <TransText en="UN Agency and International Cooperation" ar="وكالة الأمم المتحدة والتعاون الدولي" fr="Agence des Nation Unies et de Coopération Internationale" />
                    </option>
                    <option value="publiques">
                        <TransText en="Public Institution" ar="مؤسسة عمومية" fr="Institution Publique" />
                    </option>
                    <option value="academiques">
                        <TransText en="Academic and Research Institution" ar="مؤسسة أكاديمية وبحثية" fr="Institution Académique et de Recherche" />
                    </option>
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


