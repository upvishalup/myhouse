CREATE OR REPLACE FUNCTION calculate_synced_contact_less_available(
    pin_code TEXT
)RETURNS INTEGER AS $$
DECLARE
    buss_rec RECORD;
    lsc_id BIGINT;
BEGIN
        INSERT INTO LocalSyncedContact
            (CategoryId, Pin, TotalContactCount, GetContactCount)
        VALUES
            (0, pin_code, synced_count, total_contacts_in_pin)
        RETURNING Id INTO lsc_id;

        FOR buss_rec IN
            SELECT * FROM Business WHERE PinCode = pin_code
                LOOP
                    INSERT INTO SyncedBusiness
                            (LocalSyncedContactId, BusinessId)
                    VALUES
                            (lsc_id, buss_rec.Id);
                END LOOP;
    RETURN 1;
END;
$$ LANGUAGE plpgsql;



------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
------------------MAKING LOCALLY SYNCED BUSINESS FOR ALL PIN CODES------------------------------
------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION locally_synced_business_all_pin_code(
) RETURNS INTEGER AS $$
DECLARE
    rec RECORD;
    buss_count INTEGER;
    synced_count INTEGER;
    synced_count_text TEXT;
BEGIN
    SELECT Setting INTO synced_count_text FROM LocalSyncedContactSetting
        WHERE
            IdentifierName = 'TotalSyncedContact';

    -- CASTING text into INTEGER
    synced_count := CAST(synced_count_text AS INTEGER);

    FOR rec IN
        SELECT * FROM PinCode
            LOOP
                SELECT COUNT(*) IN buss_count FROM 
                    Business WHERE PinCode = pin_code;
                IF buss_count > synced_count THEN
                    PERFORM calculate_synced_contact_count_per_pin(rec.Pin);
                ELSE
                    PERFORM calculate_synced_contact_less_available(rec.Pin);
                END IF;
            END LOOP;

    RETURN 1;
END;
$$ LANGUAGE plpgsql;



RAISE NOTICE '% % % %', cat_rec.Id, pin_code, total_contact_count, effective_count;


NOTICE:  Less Continue inside 398 Plastics
NOTICE:  <> 2 313004 476 173 401 400