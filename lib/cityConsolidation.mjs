const MISSING_CITIES = {
    ANKARA: [
        { IlceAdi: 'ÇANKAYA', IlceAdiEn: 'CANKAYA' },
        { IlceAdi: 'YENİMAHALLE', IlceAdiEn: 'YENIMAHALLE' },
        { IlceAdi: 'KEÇİÖREN', IlceAdiEn: 'KECIOREN' }
    ],
    ANTALYA: [
        { IlceAdi: 'MURATPAŞA', IlceAdiEn: 'MURATPASA' }
    ]
};

export default function consolidateCities(data) {
    const falseRegionIndex = data.findIndex((region) => region.IlceAdi in MISSING_CITIES);
    if (falseRegionIndex === -1) return data;

    const falseRegion = data[falseRegionIndex];
    const missingCities = MISSING_CITIES[falseRegion.IlceAdi];

    const cities = missingCities.map((city) => ({
        IlceAdi: city.IlceAdi,
        IlceAdiEn: city.IlceAdiEn,
        IlceID: falseRegion.IlceID
    }));

    return [
        ...data.slice(0, falseRegionIndex),
        ...cities,
        ...data.slice(falseRegionIndex + 1)
    ].sort((a, b) => a.IlceAdi.localeCompare(b.IlceAdi));
}
