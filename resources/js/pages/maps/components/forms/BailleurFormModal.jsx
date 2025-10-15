import React from "react";
import TransText from "@components/TransText";
import data from "../../../../../json/data.json";

const BailleurFormModal = ({ open, formData, setFormData, onSubmit, onClose, loading, indicatif }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <form className="w-[min(95vw,1100px)] bg-white/95 rounded-lg shadow-md max-h-[85vh] overflow-y-auto p-6" onSubmit={onSubmit}>
                <fieldset className="bg-gray-100 p-6 rounded-lg">
                    <legend className="text-xl font-bold text-alpha mb-4">
                        <TransText en="General Information" ar="المعلومات العامة" fr="Informations Générales" />
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Institution Name" ar="اسم المؤسسة" fr="Nom de l'institution" /> <span className="text-red-500">*</span></label>
                            <input type="text" name="nom" value={formData.nom} onChange={(e)=>setFormData({...formData, nom:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Logo (PNG/JPG - max 5MB)" ar="الشعار (PNG/JPG - 5MB)" fr="Logo (PNG/JPG - max 5MB)" /></label>
                            <input name="logo_path" type="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFormData({...formData, logo_path:e.target.files?.[0]||null})} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Institution Type" ar="نوع المؤسسة" fr="Type d'institution" /> <span className="text-red-500">*</span></label>
                            <select className="w-full p-2 border rounded-md" name="type_institution" value={formData.type_institution} onChange={(e)=>setFormData({...formData, type_institution:e.target.value})}>
                                <option value=""><TransText en="Select..." ar="اختر..." fr="Sélectionner..." /></option>
                                <option>Fondation privée</option>
                                <option>Agence de développement</option>
                                <option>Fonds d'investissement</option>
                                <option>Autre</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Country of Origin" ar="بلد المنشأ" fr="Pays d'origine" /> <span className="text-red-500">*</span></label>
                            <select onChange={(e)=>setFormData({...formData, pays_origine:Array.from(e.target.selectedOptions,(o)=>o.value)})} className="w-full p-2 border rounded-md" name="pays_origine" multiple>
                                {data.map((item) => (<option key={item.id} value={item.value}>{item.name}</option>))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Geographic Coverage" ar="التغطية الجغرافية" fr="Couverture géographique" /> <span className="text-red-500">*</span></label>
                            <div className="flex flex-col max-h-40 overflow-y-auto border rounded p-2">
                                {data.map((item)=> (
                                    <label key={item.name} className="flex items-center">
                                        <input type="checkbox" checked={Array.isArray(formData.couverture_geographique)&&formData.couverture_geographique.includes(item.name)} onChange={(e)=>{
                                            const {checked} = e.target;
                                            setFormData((prev)=>{
                                                const next = new Set(prev.couverture_geographique||[]);
                                                checked ? next.add(item.name) : next.delete(item.name);
                                                return {...prev, couverture_geographique:Array.from(next)};
                                            })
                                        }} />
                                        <span className="ml-2">{item.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Website" ar="الموقع الإلكتروني" fr="Site web" /></label>
                            <input type="url" name="site_web" value={formData.site_web||''} onChange={(e)=>setFormData({...formData, site_web:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Contact Email" ar="البريد الإلكتروني للاتصال" fr="Email de contact" /></label>
                            <input type="email" name="email_contact" value={formData.email_contact||''} onChange={(e)=>setFormData({...formData, email_contact:e.target.value})} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Phone" ar="الهاتف" fr="Téléphone" /></label>
                            <input type="tel" name="telephone" value={formData.telephone||''} onChange={(e)=>setFormData({...formData, telephone:e.target.value})} className="w-full p-2 border rounded-md" placeholder="+213555000000" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Responsible Contact" ar="جهة الاتصال المسؤولة" fr="Contact responsable" /></label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input type="text" placeholder="Nom" className="p-2 border rounded-md" value={formData?.contact_responsable?.nom||''} onChange={(e)=>setFormData((p)=>({...p, contact_responsable:{...(p.contact_responsable||{}), nom:e.target.value}}))} />
                                <input type="text" placeholder="Fonction" className="p-2 border rounded-md" value={formData?.contact_responsable?.fonction||''} onChange={(e)=>setFormData((p)=>({...p, contact_responsable:{...(p.contact_responsable||{}), fonction:e.target.value}}))} />
                                <input type="email" placeholder="Email" className="p-2 border rounded-md" value={formData?.contact_responsable?.email||''} onChange={(e)=>setFormData((p)=>({...p, contact_responsable:{...(p.contact_responsable||{}), email:e.target.value}}))} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Social Media" ar="وسائل التواصل الاجتماعي" fr="Réseaux sociaux" /></label>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={!!formData?.reseaux_sociaux?.linkedin} onChange={()=>setFormData((p)=>({...p, reseaux_sociaux:{...(p.reseaux_sociaux||{}), linkedin:!(p.reseaux_sociaux?.linkedin)}}))} className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </div>
                            {formData?.reseaux_sociaux?.linkedin && (
                                <input type="url" placeholder="https://linkedin.com/company/..." value={formData.linkedin_url2||''} onChange={(e)=>setFormData({...formData, linkedin_url2:e.target.value})} className="w-full p-2 border rounded-md" />
                            )}
                            <div className="flex items-center gap-2 mt-2">
                                <input type="checkbox" checked={!!formData?.reseaux_sociaux?.twitter} onChange={()=>setFormData((p)=>({...p, reseaux_sociaux:{...(p.reseaux_sociaux||{}), twitter:!(p.reseaux_sociaux?.twitter)}}))} className="h-4 w-4" />
                                <span>Twitter</span>
                            </div>
                            {formData?.reseaux_sociaux?.twitter && (
                                <input type="url" placeholder="https://twitter.com/..." value={formData.twitter_url2||''} onChange={(e)=>setFormData({...formData, twitter_url2:e.target.value})} className="w-full p-2 border rounded-md" />
                            )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700"><TransText en="Best Practices (100 words max)" ar="أفضل الممارسات" fr="Bonnes Pratiques (100 mots max)" /></label>
                            <textarea className="w-full p-2 border rounded-md" rows="3" name="priorites_thematiques" value={formData.priorites_thematiques||''} onChange={(e)=>setFormData({...formData, priorites_thematiques:e.target.value})}></textarea>
                        </div>
                    </div>
                </fieldset>
                <div className="text-center p-4">
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

export default BailleurFormModal;


