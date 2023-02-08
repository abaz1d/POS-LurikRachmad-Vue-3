CREATE OR REPLACE FUNCTION update_mutasi_barang() RETURNS TRIGGER AS $set_mutasi_barang$
    DECLARE
    pengirim VARCHAR;
    penerima VARCHAR;
    stok_lama INTEGER;
    sum_total NUMERIC;
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update stok
            SELECT id_outlet_pengirim, id_outlet_penerima INTO pengirim, penerima FROM mutasi_barang WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = pengirim;
            UPDATE sub_varian SET stok_varian = stok_lama - NEW.qty_terima WHERE id_varian = NEW.id_varian AND id_outlet = pengirim;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = penerima;
            UPDATE sub_varian SET stok_varian = stok_lama + NEW.qty_terima WHERE id_varian = NEW.id_varian AND id_outlet = penerima;

        ELSIF (TG_OP = 'UPDATE') THEN
            --update stok
            RAISE NOTICE 'Value: %', NEW;
            SELECT id_outlet_pengirim, id_outlet_penerima INTO pengirim, penerima FROM mutasi_barang WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = pengirim;
            UPDATE sub_varian SET stok_varian = stok_lama + OLD.qty_terima - NEW.qty_terima WHERE id_varian = NEW.id_varian AND id_outlet = pengirim;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = penerima;
            UPDATE sub_varian SET stok_varian = stok_lama - OLD.qty_terima + NEW.qty_terima WHERE id_varian = NEW.id_varian AND id_outlet = penerima;
            
        ELSIF (TG_OP = 'DELETE') THEN
            --update stok
            SELECT id_outlet_pengirim, id_outlet_penerima INTO pengirim, penerima FROM mutasi_barang WHERE no_invoice = OLD.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = OLD.id_varian AND id_outlet = pengirim;
            UPDATE sub_varian SET stok_varian = stok_lama + OLD.qty_terima WHERE id_varian = OLD.id_varian AND id_outlet = pengirim;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = OLD.id_varian AND id_outlet = pengirim;
            UPDATE sub_varian SET stok_varian = stok_lama - OLD.qty_terima WHERE id_varian = OLD.id_varian AND id_outlet = pengirim;

        END IF;
        -- update mutasi_barang
        SELECT sum(qty) INTO sum_total FROM barang_mutasi_detail WHERE no_invoice = NEW.no_invoice;
        UPDATE mutasi_barang SET total_barang_mutasi = sum_total WHERE no_invoice = NEW.no_invoice;

        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_mutasi_barang$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_mutasi_barang
AFTER INSERT OR UPDATE OR DELETE ON barang_mutasi_detail
    FOR EACH ROW EXECUTE FUNCTION update_mutasi_barang();
