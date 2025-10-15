import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const EntrepriseFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                    <legend className="text-2xl font-bold text-blue-800 mb-6">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Company Name" ar="اسم الشركة" fr="Nom de l'entreprise" /></label>
                            <input type="text" value={formData.nom} onChange={(e)=>setFormData({...formData, nom:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Logo (PNG/JPG - max 5MB)" ar="الشعار (PNG/JPG - 5MB)" fr="Logo (PNG/JPG - max 5MB)" /></label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFormData({...formData, logo:e.target.files?.[0]||null})} className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Business Sector" ar="قطاع النشاط" fr="Secteur d'activité" /></label>
                            <input type="text" value={formData.secteur} onChange={(e)=>setFormData({...formData, secteur:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Company Size" ar="حجم الشركة" fr="Taille de l'entreprise" /></label>
                            <input type="text" value={formData.taille||''} onChange={(e)=>setFormData({...formData, taille:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Headquarters Country" ar="دولة المقر الرئيسي" fr="Pays du siège" /></label>
                            <select value={formData.pays_siege} onChange={(e)=>setFormData({...formData, pays_siege:e.target.value})} className="w-full p-2 border rounded-md">
                                <option value=""><TransText en="Select a country..." ar="اختر دولة..." fr="Sélectionner un pays..." /></option>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Intervention Countries" ar="دول التدخل" fr="Pays d'interventions" /></label>
                            <div className="flex flex-col max-h-40 overflow-y-auto border rounded p-2">
                                {data.map((item) => (
                                    <label key={item.name} className="flex items-center px-3 py-1">
                                        <input type="checkbox" checked={formData.regions_afrique?.includes(item.name)} value={item.name} onChange={(e)=>{
                                            const { checked, value } = e.target;
                                            setFormData((prev)=> ({
                                                ...prev,
                                                regions_afrique: checked ? [...(prev.regions_afrique||[]), value] : (prev.regions_afrique||[]).filter((r)=> r!==value)
                                            }))
                                        }} className="mr-2" />
                                        {item.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" value={formData.site_web||''} onChange={(e)=>setFormData({...formData, site_web:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Contact Email" ar="البريد الإلكتروني للاتصال" fr="Email de contact" /></label>
                            <input type="email" value={formData.email_contact||''} onChange={(e)=>setFormData({...formData, email_contact:e.target.value})} className="w-full p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Phone" ar="الهاتف" fr="Téléphone" /></label>
                            <input type="tel" value={formData.telephone||''} onChange={(e)=>setFormData({...formData, telephone:e.target.value})} className="w-full p-2 border rounded-md" placeholder="+213555000000" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Social Media" ar="وسائل التواصل الاجتماعي" fr="Réseaux sociaux" /></label>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={!!formData?.reseaux_sociaux2?.twitter} onChange={()=>setFormData((p)=>({...p, reseaux_sociaux2:{...(p.reseaux_sociaux2||{}), twitter:!(p.reseaux_sociaux2?.twitter)}}))} className="h-4 w-4" />
                                <span>Twitter</span>
                            </div>
                            {formData?.reseaux_sociaux2?.twitter && (
                                <input type="url" value={formData.twitter_url||''} onChange={(e)=>setFormData({...formData, twitter_url:e.target.value})} className="w-full p-2 border rounded" placeholder="https://twitter.com/..." />
                            )}
                            <div className="flex items-center gap-3 mt-2">
                                <input type="checkbox" checked={!!formData?.reseaux_sociaux2?.linkedin} onChange={()=>setFormData((p)=>({...p, reseaux_sociaux2:{...(p.reseaux_sociaux2||{}), linkedin:!(p.reseaux_sociaux2?.linkedin)}}))} className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </div>
                            {formData?.reseaux_sociaux2?.linkedin && (
                                <input type="url" value={formData.linkedin_url||''} onChange={(e)=>setFormData({...formData, linkedin_url:e.target.value})} className="w-full p-2 border rounded" placeholder="https://linkedin.com/..." />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="CSR/HR Contact" ar="جهة اتصال RSE/RH" fr="Contact RSE/RH" /></label>
                            <input type="text" placeholder="Nom" className="p-2 border rounded" value={formData?.contact_rse?.nom||''} onChange={(e)=>setFormData((p)=>({...p, contact_rse:{...(p.contact_rse||{}), nom:e.target.value}}))} />
                            <input type="text" placeholder="Fonction" className="p-2 border rounded" value={formData?.contact_rse?.fonction||''} onChange={(e)=>setFormData((p)=>({...p, contact_rse:{...(p.contact_rse||{}), fonction:e.target.value}}))} />
                            <input type="email" placeholder="Email" className="p-2 border rounded" value={formData?.contact_rse?.email||''} onChange={(e)=>setFormData((p)=>({...p, contact_rse:{...(p.contact_rse||{}), email:e.target.value}}))} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Inclusion Policy" ar="سياسة الإدماج" fr="Politique d'inclusion" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.politique_inclusion||''} onChange={(e)=>setFormData({...formData, politique_inclusion:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Integration Programs" ar="برامج الإدماج" fr="Programmes d'intégration" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.programmes_integration||''} onChange={(e)=>setFormData({...formData, programmes_integration:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Annual Positions/Internships" ar="وظائف/تدريبات سنوية" fr="Postes/stages annuels" /></label>
                            <input type="number" min="0" className="w-full p-2 border rounded" value={formData.postes_stages_annuels||0} onChange={(e)=>setFormData({...formData, postes_stages_annuels:parseInt(e.target.value)||0})} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Training Programs" ar="برامج التدريب" fr="Dispositifs de formation" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.dispositifs_formation||''} onChange={(e)=>setFormData({...formData, dispositifs_formation:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="NGO Partnerships" ar="شراكات OSC" fr="Partenariats OSC" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.partenariats_osc||''} onChange={(e)=>setFormData({...formData, partenariats_osc:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Philanthropic Initiatives" ar="مبادرات خيرية" fr="Initiatives de mécénat" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.initiatives_mecenat||''} onChange={(e)=>setFormData({...formData, initiatives_mecenat:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Pro Bono Skills" ar="مهارات برو بونو" fr="Compétences pro bono" /></label>
                            <select multiple value={formData.competences_pro_bono||[]} onChange={(e)=>{
                                const selected = Array.from(e.target.selectedOptions, (o)=>o.value)
                                setFormData({...formData, competences_pro_bono:selected})
                            }} className="w-full p-3 border rounded h-32">
                                <option value="mentorat">Mentorat</option>
                                <option value="formation">Formation</option>
                                <option value="coaching">Coaching</option>
                                <option value="consulting">Consulting</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Recruitment Regions" ar="مناطق التوظيف" fr="Régions de recrutement" /></label>
                            <select multiple value={formData.regions_recrutement||[]} onChange={(e)=>{
                                const selected = Array.from(e.target.selectedOptions, (o)=>o.value)
                                setFormData({...formData, regions_recrutement:selected})
                            }} className="w-full p-2 border rounded h-32">
                                {data.map((item)=> (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Sought Profiles" ar="الملفات المطلوبة" fr="Profils recherchés" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.profils_recherches||''} onChange={(e)=>setFormData({...formData, profils_recherches:e.target.value})}></textarea>
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700"><TransText en="Integration Process" ar="عملية الإدماج" fr="Processus d'intégration" /></label>
                            <textarea rows="3" className="w-full p-2 border rounded" value={formData.processus_integration||''} onChange={(e)=>setFormData({...formData, processus_integration:e.target.value})}></textarea>
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-6">
                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" disabled={loading}>
                        {loading ? (<TransText en="Submitting..." ar="جاري الإرسال..." fr="Envoi..." />) : (<TransText en="Submit Form" ar="إرسال النموذج" fr="Soumettre le formulaire" />)}
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 px-4 py-2 border border-beta text-alpha rounded">
                        <TransText en="Cancel" ar="إلغاء" fr="Annuler" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EntrepriseFormModal;


