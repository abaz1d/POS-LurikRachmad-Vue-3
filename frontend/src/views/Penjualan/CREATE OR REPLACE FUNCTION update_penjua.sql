CREATE OR REPLACE FUNCTION update_penjualan() RETURNS TRIGGER AS $set_penjualan$
    DECLARE
    outlet VARCHAR;
    stok_lama INTEGER;
    sum_harga NUMERIC;
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM penjualan WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = stok_lama - NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = outlet;

        ELSIF (TG_OP = 'UPDATE') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM penjualan WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = stok_lama + OLD.qty - NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = outlet;
            
        ELSIF (TG_OP = 'DELETE') THEN
            --update stok
            SELECT id_outlet INTO outlet FROM penjualan WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM sub_varian WHERE id_varian = OLD.id_varian AND id_outlet = outlet;
            UPDATE sub_varian SET stok_varian = stok_lama + OLD.qty WHERE id_varian = OLD.id_varian AND id_outlet = outlet;

        END IF;
        -- update penjualan
        SELECT sum(total_harga_detail_jual) INTO sum_harga FROM penjualan_detail WHERE no_invoice = NEW.no_invoice;
        UPDATE penjualan SET total_harga_jual = sum_harga WHERE no_invoice = NEW.no_invoice;

        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_penjualan$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_penjualan
AFTER INSERT OR UPDATE OR DELETE ON penjualan_detail
    FOR EACH ROW EXECUTE FUNCTION update_penjualan();