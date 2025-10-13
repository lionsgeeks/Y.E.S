import { useLocation, useNavigate } from 'react-router-dom';

const DetailsPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { details, type } = state || {};

    const renderOrganizationDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full border border-gray-200 table-auto text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Nom de l'organisation</th>
                        <td className="p-4">{details.name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Année de création</th>
                        <td className="p-4">{details.creation_year}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Statut légal</th>
                        <td className="p-4">{details.legal_status}</td>
                    </tr>
                    {details.legal_status === 'Autre' && (
                        <tr className="border-b border-gray-300">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black">Autre statut légal</th>
                            <td className="p-4">{details.other_legal_status}</td>
                        </tr>
                    )}
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Email principal</th>
                        <td className="p-4">{details.main_email}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Téléphone</th>
                        <td className="p-4">{details.phone}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Adresse postale</th>
                        <td className="p-4">{details.postal_address}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Site web</th>
                        <td className="p-4">
                            <a href={details.website} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                                {details.website}
                            </a>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays d'implantations</th>
                        <td className="p-4">{details.country}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays d'interventions</th>
                        <td className="p-4">{details.regions}</td>
                    </tr>
                    <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Réseaux sociaux</th>
                        <td className="p-4">
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Facebook: <a href={details.facebook_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.facebook_url}</a>
                                </li>

                                <li>
                                    Twitter: <a href={details.twitter_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.twitter_url}</a>
                                </li>
                                <li>
                                    LinkedIn: <a href={details.linkedin_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.linkedin_url}</a>
                                </li>
                                <li>
                                    Instagram: <a href={details.instagram_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.instagram_url}</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Nom du contact</th>
                        <td className="p-4">{details.contact_name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Fonction du contact</th>
                        <td className="p-4">{details.contact_function}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Email du contact</th>
                        <td className="p-4">{details.contact_email}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Zones d’intervention</th>
                        <td className="p-4">{details.intervention_areas}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Groupes cibles</th>
                        <td className="p-4">{details.target_groups}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Bénéficiaires annuels</th>
                        <td className="p-4">{details.annual_beneficiaries}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Bonnes Pratiques</th>
                        <td className="p-4">{details.program_title}</td>
                    </tr>
                    {/* <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Description du programme</th>
                        <td className="p-4">{details.program_description}</td>
                    </tr>
                    <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Approche méthodologique</th>
                        <td className="p-4">{details.methodological_approach}</td>
                    </tr>
                    <tr className="border-b border-gray-300 align-top">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats attendus</th>
                        <td className="p-4">
                            <ul className="list-disc list-inside space-y-1">
                                <li>{details.result1}</li>
                                <li>{details.result2}</li>
                                <li>{details.result3}</li>
                            </ul>
                        </td>
                    </tr> */}
                    {/* <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Partenaires techniques</th>
                        <td className="p-4">{details.technical_partners}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Partenaires financiers</th>
                        <td className="p-4">{details.financial_partners}</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );

    const renderBailleurDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md overflow-x-auto">

            <table className="min-w-full border border-gray-300 table-auto bg-white text-sm rounded-md">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Nom d'institution</th>
                        <td className="p-4">{details.nom}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Type d'institution</th>
                        <td className="p-4">{details.type_institution}</td>
                    </tr>
                    {details.type_institution === 'Autre' && (
                        <tr className="border-b border-gray-300">
                            <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Autre</th>
                            <td className="p-4">{details.type_institution_autre}</td>
                        </tr>
                    )}
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Pays d’origine</th>
                        <td className="p-4">{details.pays_origine}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Couverture géographique</th>
                        <td className="p-4">{details.couverture_geographique}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Site web</th>
                        <td className="p-4">
                            <a href={details.site_web} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                {details.site_web}
                            </a>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Email</th>
                        <td className="p-4">{details.email_contact}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Téléphone</th>
                        <td className="p-4">{details.telephone}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3 align-top">Contact responsable</th>
                        <td className="p-4">
                            <p><strong>Nom:</strong> {details.contact_responsable?.nom}</p>
                            <p><strong>Fonction:</strong> {details.contact_responsable?.fonction}</p>
                            <p><strong>Email:</strong> {details.contact_responsable?.email}</p>
                        </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3 align-top">Réseaux sociaux</th>
                        <td className="p-4">
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Twitter: <a href={details.twitter_url2} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.twitter_url2}</a>
                                </li>
                                <li>
                                    LinkedIn: <a href={details.linkedin_url2} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.linkedin_url2}</a>
                                </li>
                            </ul>
                        </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Bonnes Pratiques</th>
                        <td className="p-4">{details.priorites_thematiques}</td>
                    </tr>
                    {/* <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Modalités de soutien</th>
                        <td className="p-4">{details.modalites_soutien}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Financement minimum</th>
                        <td className="p-4">{details.financement_min}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Financement maximum</th>
                        <td className="p-4">{details.financement_max}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Budget annuel</th>
                        <td className="p-4">{details.budget_annuel}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Critères d’éligibilité</th>
                        <td className="p-4">{details.criteres_eligibilite}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Projets phares</th>
                        <td className="p-4">{details.projets_phares}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Approche d’impact</th>
                        <td className="p-4">{details.approche_impact}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Partenaires actuels</th>
                        <td className="p-4">{details.partenaires_actuels}</td>
                    </tr>
                    <tr className='border-b
     border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Procédure de soumission</th>
                        <td className="p-4">{details.procedure_soumission}</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );

    const renderEntrepriseDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md overflow-x-auto">

            <table className="min-w-full border border-gray-300 rounded-md text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Nom de l'entreprise</th>
                        <td className="p-4">{details.nom}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Secteur</th>
                        <td className="p-4">{details.secteur}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Taille</th>
                        <td className="p-4">{details.taille}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Pays du siège</th>
                        <td className="p-4">{details.pays_siege}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Pays d'interventions</th>
                        <td className="p-4">{details.regions_afrique}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Site web</th>
                        <td className="p-4">
                            <a href={details.site_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                {details.site_web}
                            </a>
                        </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Email de contact</th>
                        <td className="p-4">{details.email_contact}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Téléphone</th>
                        <td className="p-4">{details.telephone_code} {details.telephone_number}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Nom du contact RSE</th>
                        <td className="p-4">{details.contact_rse.nom}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Fonction du contact RSE</th>
                        <td className="p-4">{details.contact_rse.fonction}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Email du contact RSE</th>
                        <td className="p-4">{details.contact_rse.email}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Politique d'inclusion</th>
                        <td className="p-4">{details.politique_inclusion}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Programmes d'intégration</th>
                        <td className="p-4">{details.programmes_integration}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Postes/stages annuels</th>
                        <td className="p-4">{details.postes_stages_annuels}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Dispositifs de formation</th>
                        <td className="p-4">{details.dispositifs_formation}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Partenariats avec OSC</th>
                        <td className="p-4">{details.partenariats_osc}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Initiatives de mécénat</th>
                        <td className="p-4">{details.initiatives_mecenat}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Compétences pro bono</th>
                        <td className="p-4">{details.competences_pro_bono}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Profils recherchés</th>
                        <td className="p-4">{details.profils_recherches}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Régions de recrutement</th>
                        <td className="p-4">{details.regions_recrutement}</td>
                    </tr>

                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black w-1/3">Processus d'intégration</th>
                        <td className="p-4">{details.processus_integration}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


    const renderAgenceDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <table className="w-full border border-gray-300 table-auto text-left text-sm">
                <tbody>
                    <tr className="border-b text-center border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Name</th>
                        <th className='p-4'> {details.nom}</th>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Type d'organisation</th>
                        <td className="p-4">{details.type_organisation}</td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays représentés</th><td className="p-4">{details.pays_representes}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Couverture en Afrique</th><td className="p-4">{details.couverture_afrique}</td></tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Site web</th>
                        <td className="p-4">
                            <a href={details.site_web} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                {details.site_web}
                            </a>
                        </td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email institutionnel</th><td className="p-4">{details.email_institutionnel}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Bureaux en Afrique</th><td className="p-4">{details.bureaux_afrique}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="p-4 bg-[#e0ecff9d] text-alpha font-semibold">Contact Jeunesse</th></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Nom</th><td className="p-4">{details.contact_jeunesse?.nom}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Fonction</th><td className="p-4">{details.contact_jeunesse?.fonction}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email</th><td className="p-4">{details.contact_jeunesse?.email}</td></tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Priorités thématiques</th><td className="p-4">{details.priorites_thematiques}</td></tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Cadre stratégique</th>
                        <td className="p-4">
                            <a href={`https://management.youthempowermentsummit.africa/storage/${details.cadre_strategique}`} className="text-blue-600">Télécharger</a>
                        </td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Budget</th><td className="p-4">{details.budget}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Période</th><td className="p-4">{details.annee_debut} - {details.annee_fin}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="p-2 bg-[#e0ecff9d] text-alpha font-semibold">Programmes Phares</th></tr>
                    {details.programmes_phares?.map((programme, index) => (
                        <>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Titre</th><td className="p-4">{programme.titre}</td></tr>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Objectifs</th><td className="p-4">{programme.objectifs}</td></tr>
                            <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays d'intervention</th><td className="p-4">{programme.pays_intervention}</td></tr>
                            <tr className='border-b border-alpha'>
                                <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats</th>
                                <td className="p-4">
                                    <ul className="list-disc ml-4">
                                        {programme.resultats
                                            .split('.')
                                            .filter(r => r.trim() !== '')
                                            .map((res, i) => <li key={i}>{res.trim()}.</li>)
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </>
                    ))}

                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Outils méthodologiques</th>
                        <td className="p-4">
                            <a href={`https://management.youthempowermentsummit.africa/storage/${details.outils_methodologiques}`} className="text-blue-600">Télécharger</a>
                        </td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Opportunités de financement</th><td className="p-4">{details.opportunites_financement}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Type de partenaires recherchés</th><td className="p-4">{details.type_partenaires}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Domaines d'expertise</th><td className="p-4">{details.domaines_expertise}</td></tr>
                </tbody>
            </table>
        </div>
    );

    const renderPubliqueDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">

            <table className="w-full border border-gray-300 text-sm table-auto text-left">
                <tbody>
                    <tr className="border-b text-center border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Name:</th>
                        <td className='p-4'>{details.institution_name}</td>
                    </tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Type d'institution</th><td className="p-4">{details.institution_type}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Pays</th><td className="p-4">{details.country}</td></tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Site web</th>
                        <td className="p-4">
                            <a href={details.website} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                {details.website}
                            </a>
                        </td>
                    </tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email</th><td className="p-4">{details.email}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Téléphone</th><td className="p-4">{details.phone_code} {details.phone_number}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Adresse</th><td className="p-4">{details.address}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="border-t border-b border-alpha p-2 bg-[#e0ecff9d] text-alpha font-semibold">Contact Jeunesse</th></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Nom</th><td className="p-4">{details.youth_contact_name}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Poste</th><td className="p-4">{details.youth_contact_position}</td></tr>
                    <tr className='border-b border-alpha'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Email</th><td className="p-4">{details.youth_contact_email}</td></tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Cadre politique</th><td className="p-4">{details.policy_framework}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Priorités stratégiques</th><td className="p-4">{details.strategic_priorities}</td></tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Budget annuel</th><td className="p-4">{details.annual_budget}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Public cible</th><td className="p-4">{details.execution_partners}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Mécanismes de soutien</th><td className="p-4">{details.support_mechanisms}</td></tr>

                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Nom du Programme phare</th><td className="p-4">{details.flagship_program}</td></tr>

                    <tr className='border-b border-gray-300'><th colSpan="2" className="border-t border-b border-alpha p-2 bg-[#e0ecff9d] text-alpha font-semibold">Résultats attendus</th></tr>

                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats 1</th><td className="p-4">{details.expected_result_1}</td>
                    </tr>
                    <tr className='border-b border-gray-300'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats 2</th><td className="p-4">{details.expected_result_2}</td>
                    </tr>
                    <tr className='border-b border-alpha'>
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black">Résultats 3</th><td className="p-4">{details.expected_result_2}</td>
                    </tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Assistance Technique</th><td className="p-4">{details.technical_assistance}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Bonnes pratiques Recherchées</th><td className="p-4">{details.best_practices}</td></tr>
                    <tr className='border-b border-gray-300'><th className="text-left p-4 bg-[#e0ecff9d] text-black">Opportunites de cooperation </th><td className="p-4">{details.cooperation_opportunities}</td></tr>

                </tbody>
            </table>
        </div>
    );


    const renderAcademiqueDetails = () => (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">

            <table className="table-auto w-full border border-gray-300 text-sm">
                <tbody>
                    <tr className="border-b border-gray-300">
                        <th className=" p-4 bg-alpha text-white w-1/4 border-r">Qestions</th>
                        <th className=" p-4 bg-alpha text-white w-1/2">Reponse Type</th>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Nom d'institution</th>
                        <td className="p-4">{details.nom}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Type d'institution</th>
                        <td className="p-4">{details.type_institution}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Pays</th>
                        <td className="p-4">{details.pays}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Département</th>
                        <td className="p-4">{details.departement}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Site web</th>
                        <td className="p-4">
                            {details.site_web ? (
                                <a href={details.site_web} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                    {details.site_web}
                                </a>
                            ) : 'Non renseigné'}
                        </td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Email</th>
                        <td className="p-4">{details.email}</td>
                    </tr>
                    <tr className="border-b border-alpha">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Téléphone</th>
                        <td className="p-4">{details.telephone}</td>
                    </tr>

                    <tr className="border-b border-alpha">
                        <th colSpan="2" className="text-left p-4 bg-[#e0ecff9d] text-black ">Contact Chercheur</th>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Nom</th>
                        <td className="p-4">{details.contact_nom}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Fonction</th>
                        <td className="p-4">{details.contact_fonction}</td>
                    </tr>
                    <tr className="border-b border-alpha">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Email</th>
                        <td className="p-4">{details.contact_email}</td>
                    </tr>

                    <tr className="border-b ">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Axes de recherche</th>
                        <td className="p-4">{details.axes_recherche}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Méthodologies</th>
                        <td className="p-4">{details.methodologies}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Zones géographiques</th>
                        <td className="p-4">{details.zones_geographiques}</td>
                    </tr>

                    <tr className="border-b ">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Programmes de formation</th>
                        <td className="p-4">{details.programmes_formation}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Public cible</th>
                        <td className="p-4">{details.public_cible}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Modalités</th>
                        <td className="p-4">{details.modalites}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Certifications</th>
                        <td className="p-4">{details.certifications}</td>
                    </tr>

                    <tr className="border-b ">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Partenaires de recherche</th>
                        <td className="p-4">{details.partenaires_recherche}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Expertise</th>
                        <td className="p-4">{details.expertise}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Conférences</th>
                        <td className="p-4">{details.conferences}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Ateliers</th>
                        <td className="p-4">{details.ateliers}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="text-left p-4 bg-[#e0ecff9d] text-black ">Ressources disponibles</th>
                        <td className="p-4">{details.ressources_disponibles}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


    const renderContent = () => {
        if (!details) return <div className="text-center py-8">Aucune donnée disponible</div>;

        switch (type) {
            case 'App\\Models\\Organization':
                return renderOrganizationDetails();
            case 'App\\Models\\Bailleur':
                return renderBailleurDetails();
            case 'App\\Models\\Entreprise':
                return renderEntrepriseDetails();
            case 'App\\Models\\Agence':
                return renderAgenceDetails();
            case 'App\\Models\\Publique':
                return renderPubliqueDetails();
            case 'App\\Models\\Academique':
                return renderAcademiqueDetails();
            default:
                return <div className="text-red-500">Type non reconnu: {type}</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 p-2  text-beta border border-beta rounded "
            >
                ← Retour à la carte
            </button>
            {renderContent()}
        </div>
    );
};

export default DetailsPage;