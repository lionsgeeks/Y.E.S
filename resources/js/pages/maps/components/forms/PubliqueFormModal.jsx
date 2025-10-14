import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const PubliqueFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Name" ar="اسم المؤسسة" fr="Nom de l'institution" /></label>
                            <input type="text" value={formData.institution_name} onChange={(e)=>setFormData({...formData, institution_name:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Logo/Emblem (PNG/JPG)" ar="الشعار" fr="Logo/emblème (PNG/JPG)" /></label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFormData({...formData, logo_path:e.target.files?.[0]||null})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institution Type" ar="نوع المؤسسة" fr="Type d'institution" /></label>
                            <select value={formData.institution_type} onChange={(e)=>setFormData({...formData, institution_type:e.target.value})} className="w-full p-3 border rounded-lg">
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Ministère</option>
                                <option>Agence gouvernementale</option>
                                <option>Collectivité territoriale</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Country" ar="البلد" fr="Pays" /></label>
                            <select value={formData.country} onChange={(e)=>setFormData({...formData, country:e.target.value})} className="w-full p-2 border rounded-md">
                                <option value=""><TransText en="Select a country..." ar="اختر دولة..." fr="Sélectionner un pays..." /></option>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" value={formData.website||''} onChange={(e)=>setFormData({...formData, website:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Institutional Email" ar="البريد الإلكتروني المؤسسي" fr="Email institutionnel" /></label>
                            <input type="email" value={formData.email||''} onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Phone" ar="الهاتف" fr="Téléphone" /></label>
                            <div className="flex">
                                <select value={formData.phone_code||''} onChange={(e)=>setFormData({...formData, phone_code:e.target.value})} className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white">
                                    <option value=""><TransText en="+Code" ar="+الرمز" fr="+Indicatif" /></option>
                                    {indicatif?.sort((a,b)=>a.dial_code.localeCompare(b.dial_code)).map((item)=> (<option key={item.id} value={item.dial_code}>{item.dial_code}</option>))}
                                </select>
                                <input type="tel" value={formData.phone_number||''} onChange={(e)=>setFormData({...formData, phone_number:e.target.value})} className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300" placeholder="Numéro" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Official Address" ar="العنوان الرسمي" fr="Adresse officielle" /></label>
                            <textarea rows="2" value={formData.address||''} onChange={(e)=>setFormData({...formData, address:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Youth Department Contact" ar="جهة اتصال قسم الشباب" fr="Contact département jeunesse" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" placeholder="Nom" value={formData.youth_contact_name||''} onChange={(e)=>setFormData({...formData, youth_contact_name:e.target.value})} className="p-3 border rounded-lg" />
                                <input type="text" placeholder="Fonction" value={formData.youth_contact_position||''} onChange={(e)=>setFormData({...formData, youth_contact_position:e.target.value})} className="p-3 border rounded-lg" />
                                <input type="email" placeholder="Email" value={formData.youth_contact_email||''} onChange={(e)=>setFormData({...formData, youth_contact_email:e.target.value})} className="p-3 border rounded-lg" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="National Policy Framework" ar="الإطار السياسي الوطني" fr="Cadre politique national" /></label>
                            <input type="text" value={formData.policy_framework||''} onChange={(e)=>setFormData({...formData, policy_framework:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Strategic Priorities" ar="الأولويات الاستراتيجية" fr="Priorités stratégiques" /></label>
                            <textarea rows="3" value={formData.strategic_priorities||''} onChange={(e)=>setFormData({...formData, strategic_priorities:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Annual Budget (€)" ar="الميزانية السنوية (€)" fr="Budget annuel (€)" /></label>
                            <input type="number" min="0" value={formData.annual_budget||''} onChange={(e)=>setFormData({...formData, annual_budget:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Flagship Program" ar="البرنامج الرئيسي" fr="Programme phare" /></label>
                            <input type="text" value={formData.flagship_program||''} onChange={(e)=>setFormData({...formData, flagship_program:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Target Audience" ar="الجمهور المستهدف" fr="Public cible" /></label>
                            <textarea rows="2" value={formData.target_audience||''} onChange={(e)=>setFormData({...formData, target_audience:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Support Mechanisms" ar="آليات الدعم" fr="Dispositifs d'accompagnement" /></label>
                            <textarea rows="3" value={formData.support_mechanisms||''} onChange={(e)=>setFormData({...formData, support_mechanisms:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Expected Results" ar="النتائج المتوقعة" fr="Résultats attendus" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" value={formData.expected_result_1||''} onChange={(e)=>setFormData({...formData, expected_result_1:e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Résultat 1" />
                                <input type="text" value={formData.expected_result_2||''} onChange={(e)=>setFormData({...formData, expected_result_2:e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Résultat 2" />
                                <input type="text" value={formData.expected_result_3||''} onChange={(e)=>setFormData({...formData, expected_result_3:e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Résultat 3" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Execution Partners" ar="شركاء التنفيذ" fr="Partenaires d'exécution" /></label>
                            <textarea rows="3" value={formData.execution_partners||''} onChange={(e)=>setFormData({...formData, execution_partners:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Coordination Mechanism" ar="آلية التنسيق" fr="Mécanisme de coordination" /></label>
                            <input type="text" value={formData.coordination_mechanism||''} onChange={(e)=>setFormData({...formData, coordination_mechanism:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Involved Actors" ar="الأطراف المعنية" fr="Acteurs impliqués" /></label>
                            <textarea rows="2" value={formData.involved_actors||''} onChange={(e)=>setFormData({...formData, involved_actors:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Monitoring Approach" ar="نهج المتابعة" fr="Approche de suivi" /></label>
                            <textarea rows="3" value={formData.monitoring_approach||''} onChange={(e)=>setFormData({...formData, monitoring_approach:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Technical Assistance" ar="المساعدة الفنية" fr="Assistance technique" /></label>
                            <textarea rows="3" value={formData.technical_assistance||''} onChange={(e)=>setFormData({...formData, technical_assistance:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Best Practices" ar="أفضل الممارسات" fr="Bonnes pratiques" /></label>
                            <textarea rows="3" value={formData.best_practices||''} onChange={(e)=>setFormData({...formData, best_practices:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Cooperation Opportunities" ar="فرص التعاون" fr="Opportunités de coopération" /></label>
                            <textarea rows="3" value={formData.cooperation_opportunities||''} onChange={(e)=>setFormData({...formData, cooperation_opportunities:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-6">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        <TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PubliqueFormModal;


