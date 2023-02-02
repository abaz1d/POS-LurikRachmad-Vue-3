CREATE OR REPLACE FUNCTION update_barang_keluar() RETURNS TRIGGER AS $set_barang_keluar$
    DECLARE
   total_lama INTEGER;
    sum_harga NUMERIC;
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update total
            SELECT stok_varian INTO total_lama FROM varian WHERE id_varian = NEW.id_varian;
            UPDATE varian SET stok_varian = total_lama - NEW.qty WHERE id_varian = NEW.id_varian;

        ELSIF (TG_OP = 'UPDATE') THEN
            --update total
            SELECT stok_varian INTO total_lama FROM varian WHERE id_varian = NEW.id_varian;
            UPDATE varian SET stok_varian = total_lama + OLD.qty - NEW.qty WHERE id_varian = NEW.id_varian;
            
        ELSIF (TG_OP = 'DELETE') THEN
            --update total
            SELECT stok_varian INTO total_lama FROM varian WHERE id_varian = OLD.id_varian;
            UPDATE varian SET stok_varian = total_lama + OLD.qty WHERE id_varian = OLD.id_varian;

        END IF;
        -- update penjualan
        SELECT sum(total_harga_detail_jual) INTO sum_harga FROM barang_keluar_detail WHERE no_invoice = NEW.no_invoice;
        UPDATE penjualan SET total_harga_jual = sum_harga WHERE no_invoice = NEW.no_invoice;

        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_barang_keluar$ LANGUAGE plpgsql;

CREATE TRIGGER set_barang_keluar
AFTER INSERT OR UPDATE OR DELETE ON barang_keluar_detail
    FOR EACH ROW EXECUTE FUNCTION update_barang_keluar();
