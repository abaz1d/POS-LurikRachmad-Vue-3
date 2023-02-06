CREATE OR REPLACE FUNCTION update_pembelian() RETURNS TRIGGER AS $set_pembelian$
    DECLARE
    id_outlet VARCHAR;
    stok_lama INTEGER;
    sum_harga NUMERIC;
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            --update stok
            SELECT id_outlet INTO id_outlet FROM pembelian WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM varian WHERE id_varian = NEW.id_varian AND id_outlet = id_outlet;
            UPDATE varian SET stok_varian = stok_lama + NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = id_outlet;

        ELSIF (TG_OP = 'UPDATE') THEN
            --update stok
            SELECT id_outlet INTO id_outlet FROM pembelian WHERE no_invoice = NEW.no_invoice;
            SELECT stok_varian INTO stok_lama FROM varian WHERE id_varian = NEW.id_varian AND id_outlet = id_outlet;
            UPDATE varian SET stok_varian = stok_lama - OLD.qty + NEW.qty WHERE id_varian = NEW.id_varian AND id_outlet = id_outlet;
            
        ELSIF (TG_OP = 'DELETE') THEN
            --update stok
            SELECT id_outlet INTO id_outlet FROM pembelian WHERE no_invoice = OLD.no_invoice;
            SELECT stok_varian INTO stok_lama FROM varian WHERE id_varian = OLD.id_varian AND id_outlet = id_outlet;
            UPDATE varian SET stok_varian = stok_lama - OLD.qty WHERE id_varian = OLD.id_varian AND id_outlet = id_outlet;

        END IF;
        -- update pembelian
        SELECT sum(total_harga_detail_beli) INTO sum_harga FROM pembelian_detail WHERE no_invoice = NEW.no_invoice;
        UPDATE pembelian SET total_harga_beli = sum_harga WHERE no_invoice = NEW.no_invoice;

        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$set_pembelian$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_pembelian
AFTER INSERT OR UPDATE OR DELETE ON pembelian_detail
    FOR EACH ROW EXECUTE FUNCTION update_pembelian();